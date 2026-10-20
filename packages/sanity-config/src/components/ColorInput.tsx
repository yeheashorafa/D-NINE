import React, { useCallback, useId } from 'react';
import { set, unset, type StringInputProps } from 'sanity';
import { Card, Flex, Box, Text, Button, TextInput, Badge, Stack } from '@sanity/ui';
import { ResetIcon } from '@sanity/icons';

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

export interface ColorInputOptions {
  defaultColor?: string;
}

export function ColorInput(props: StringInputProps) {
  const { value, onChange, schemaType, readOnly } = props;
  const options = (schemaType.options || {}) as ColorInputOptions;
  const defaultColor = options.defaultColor || '#000000';
  const inputId = useId();

  const isCustom = typeof value === 'string' && HEX_COLOR_REGEX.test(value);
  const displayHex = isCustom ? value.toUpperCase() : defaultColor.toUpperCase();

  const handleColorPickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextColor = e.target.value.toUpperCase();
      if (HEX_COLOR_REGEX.test(nextColor)) {
        onChange(set(nextColor));
      }
    },
    [onChange]
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.trim();
      if (!raw) {
        onChange(unset());
        return;
      }
      const formatted = raw.startsWith('#') ? raw : `#${raw}`;
      if (HEX_COLOR_REGEX.test(formatted)) {
        onChange(set(formatted.toUpperCase()));
      } else {
        // Still allow typing while validating via schema Rule
        onChange(set(formatted));
      }
    },
    [onChange]
  );

  const handleReset = useCallback(() => {
    onChange(unset());
  }, [onChange]);

  return (
    <Card padding={2} radius={2} border tone={isCustom ? 'primary' : 'default'}>
      <Stack gap={3}>
        <Flex align="center" gap={3} wrap="wrap">
          {/* Native HTML5 Color Picker */}
          <Box style={{ position: 'relative', width: 44, height: 38, flexShrink: 0 }}>
            <input
              id={inputId}
              type="color"
              value={HEX_COLOR_REGEX.test(displayHex) ? displayHex : defaultColor}
              onChange={handleColorPickerChange}
              disabled={readOnly}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: readOnly ? 'default' : 'pointer',
                zIndex: 2,
              }}
            />
            <div
              aria-hidden="true"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 6,
                backgroundColor: displayHex,
                border: '2px solid rgba(0, 0, 0, 0.2)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: readOnly ? 'default' : 'pointer',
              }}
            />
          </Box>

          {/* Hex Value Text Input */}
          <Box flex={1} style={{ minWidth: 140 }}>
            <TextInput
              value={value || ''}
              placeholder={`${defaultColor} (الافتراضي)`}
              onChange={handleTextChange}
              readOnly={readOnly}
              style={{
                fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            />
          </Box>

          {/* Status Badge */}
          <Badge tone={isCustom ? 'positive' : 'caution'} fontSize={1}>
            {isCustom ? 'مخصص' : 'الافتراضي'}
          </Badge>

          {/* Reset / Default Button */}
          {isCustom && !readOnly && (
            <Button
              icon={ResetIcon}
              text="استخدام اللون الافتراضي"
              mode="ghost"
              tone="critical"
              fontSize={1}
              padding={2}
              onClick={handleReset}
              title="إعادة تعيين اللون إلى القيمة الافتراضية الحالية للموقع"
            />
          )}
        </Flex>

        {/* Informative helper note */}
        <Flex justify="space-between" align="center">
          <Text size={1} muted>
            {isCustom
              ? `القيمة الحالية: ${value?.toUpperCase()} (الافتراضي: ${defaultColor})`
              : `يستخدم اللون الافتراضي للموقع: ${defaultColor}`}
          </Text>
        </Flex>
      </Stack>
    </Card>
  );
}
