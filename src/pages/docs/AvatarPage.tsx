import React, { useState } from 'react';
import { Avatar, AvatarGroup, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const avatarProps: PropDef[] = [
  { name: 'name', type: 'string', description: 'Used to generate initials and as alt text fallback.' },
  { name: 'src', type: 'string', description: 'Image URL. Falls back to initials if image fails to load.' },
  { name: 'alt', type: 'string', description: 'Alt text for the image.' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar size.' },
  { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Shape of the avatar.' },
];

const avatarGroupProps: PropDef[] = [
  { name: 'max', type: 'number', description: 'Maximum avatars to show before overflow count. When omitted, all avatars are shown.' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Applied to all child avatars.' },
];

export function AvatarPage() {
  const [avatarSize, setAvatarSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [avatarShape, setAvatarShape] = useState<'circle' | 'square'>('circle');
  const [showImage, setShowImage] = useState(true);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Components</p>
        <h1 className="doc-page__title">Avatar</h1>
        <p className="doc-page__desc">
          Displays user profile images with automatic initial fallbacks.
          AvatarGroup stacks multiple avatars with configurable overflow handling.
        </p>
      </header>

      {/* Interactive */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Avatar
  ${showImage ? 'src="https://i.pravatar.cc/80?img=3"\n  ' : ''}name="Alex Kim"
  size="${avatarSize}"
  shape="${avatarShape}"
/>`}
          controls={
            <>
              <DemoControl
                label="Size"
                options={['xs', 'sm', 'md', 'lg', 'xl']}
                value={avatarSize}
                onChange={(v) => setAvatarSize(v as typeof avatarSize)}
              />
              <DemoControl
                label="Shape"
                options={['circle', 'square']}
                value={avatarShape}
                onChange={(v) => setAvatarShape(v as typeof avatarShape)}
              />
              <DemoToggle label="Show Image" value={showImage} onChange={setShowImage} />
            </>
          }
        >
          <Avatar
            src={showImage ? 'https://i.pravatar.cc/80?img=3' : undefined}
            name="Alex Kim"
            size={avatarSize}
            shape={avatarShape}
          />
        </ComponentPreview>
      </div>

      {/* All Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Sizes</h2>
        <ComponentPreview
          code={`<Stack direction="row" gap={4} align="center">
  <Avatar name="U" size="xs" />  {/* 20px */}
  <Avatar name="U" size="sm" />  {/* 28px */}
  <Avatar name="U" size="md" />  {/* 36px */}
  <Avatar name="U" size="lg" />  {/* 48px */}
  <Avatar name="U" size="xl" />  {/* 64px */}
</Stack>`}
        >
          <Stack direction="row" gap={4} align="center">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size, i) => (
              <Avatar key={size} name={`User ${i + 1}`} size={size} />
            ))}
          </Stack>
        </ComponentPreview>
      </div>

      {/* With Images */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Images & Fallbacks</h2>
        <p className="doc-section__desc">
          Falls back to generated initials when no image is provided or when the image fails to load.
        </p>
        <ComponentPreview
          code={`<Stack direction="row" gap={3} align="center">
  <Avatar src="https://i.pravatar.cc/80?img=1" name="User A" size="lg" />
  <Avatar src="https://i.pravatar.cc/80?img=2" name="User B" size="lg" shape="square" />
  <Avatar src="invalid-url" name="Jordan Lee" size="lg" />  {/* Falls back to "JL" */}
  <Avatar name="No Image" size="lg" />
</Stack>`}
        >
          <Stack direction="row" gap={3} align="center">
            <Avatar src="https://i.pravatar.cc/80?img=1" name="User A" size="lg" />
            <Avatar src="https://i.pravatar.cc/80?img=2" name="User B" size="lg" shape="square" />
            <Avatar src="invalid-url" name="Jordan Lee" size="lg" />
            <Avatar name="No Image" size="lg" />
          </Stack>
        </ComponentPreview>
      </div>

      {/* AvatarGroup */}
      <div className="doc-section">
        <h2 className="doc-section__title">Avatar Group</h2>
        <p className="doc-section__desc">
          Stacks multiple avatars with a configurable overflow limit.
          Use <code className="inline-code">max</code> to control how many are shown.
        </p>
        <ComponentPreview
          code={`<AvatarGroup max={4} size="md">
  <Avatar src="…" name="User 1" />
  <Avatar src="…" name="User 2" />
  <Avatar src="…" name="User 3" />
  <Avatar src="…" name="User 4" />
  <Avatar src="…" name="User 5" />
  <Avatar src="…" name="User 6" />
</AvatarGroup>`}
        >
          <Stack gap={4}>
            <AvatarGroup max={4} size="md">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Avatar key={i} src={`https://i.pravatar.cc/80?img=${i}`} name={`User ${i}`} />
              ))}
            </AvatarGroup>
            <AvatarGroup max={3} size="lg">
              {[7, 8, 9, 10, 11].map((i) => (
                <Avatar key={i} src={`https://i.pravatar.cc/80?img=${i}`} name={`User ${i}`} />
              ))}
            </AvatarGroup>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Avatar</h2>
        <PropsTable props={avatarProps} />
      </div>
      <div className="doc-section">
        <h2 className="doc-section__title">Props — AvatarGroup</h2>
        <PropsTable props={avatarGroupProps} />
      </div>
    </>
  );
}
