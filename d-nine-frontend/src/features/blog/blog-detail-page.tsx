import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { PortableText } from '@portabletext/react';
import { getBlogPostBySlug, getAllBlogPosts } from '@/services/content/blog.service';
import { RelatedPosts } from './components/related-posts';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Clock, User } from 'lucide-react';

export interface BlogDetailPageProps {
  slug: string;
}

export async function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getAllBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const title = isArabic ? post.title.ar : post.title.en;
  const excerpt = isArabic ? post.excerpt.ar : post.excerpt.en;
  const categoryLabel = isArabic ? post.category.ar : post.category.en;
  const authorName = isArabic ? post.author.name.ar : post.author.name.en;
  const authorRole = isArabic ? post.author.role.ar : post.author.role.en;
  const tags = isArabic ? post.tags.ar : post.tags.en;

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-brand-cyan transition-colors"
          >
            {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isArabic ? 'العودة للمدونة' : 'Back to Blog'}</span>
          </Link>
        </div>

        {/* Post Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-wider">
              {categoryLabel}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {post.readTimeMinutes} {isArabic ? 'دقائق قراءة' : 'min read'}
              </span>
            </div>
            <span className="text-xs text-text-muted font-mono">• {post.publishedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-lg text-text-muted leading-relaxed">
            {excerpt}
          </p>

          {/* Author Badge */}
          <div className="pt-2 flex items-center gap-3">
            {post.author.image ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand-cyan/20">
                <Image src={post.author.image} alt={authorName} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-brand text-white flex items-center justify-center font-bold text-sm">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <p className="text-sm font-bold text-foreground">{authorName}</p>
              <p className="text-xs text-text-muted">{authorRole}</p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-border shadow-2xl mb-12">
          <Image
            src={post.image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="space-y-8 text-foreground leading-relaxed prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-text-muted prose-a:text-brand-cyan">
          <PortableText value={(isArabic ? post.body?.ar : post.body?.en) as any} />
        </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-surface-muted text-text-muted text-xs font-medium border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Articles */}
          <RelatedPosts currentPost={post} allPosts={allPosts} />
      </div>
    </main>
  );
}
