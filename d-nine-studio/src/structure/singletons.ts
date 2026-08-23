import { StructureBuilder } from 'sanity/structure';

export const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: React.ComponentType
) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(title)
    );
