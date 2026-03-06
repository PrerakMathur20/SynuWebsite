import React, { useState, useCallback } from 'react';
import {
  ButtonRoot, ButtonLabel, ButtonIcon,
  TextField, Textarea,
  Checkbox, RadioGroup, Radio,
  Switch, Select, Slider,
  Badge, Avatar, Chip,
  Alert,
  Progress, Spinner,
  Card, CardHeader, CardBody, CardTitle, CardDescription,
  Tabs,
  Stack,
  Tooltip,
  useSnackbar, SnackbarContainer,
  Rating,
  OtpInput,
  FileDropZone,
  Accordion,
  CodeBlock,
} from '@tokis/react';

// ─── Icons ───────────────────────────────────────────────────

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11 12H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7l2 2v7a1 1 0 0 1-1 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M9 12V8H5v4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1.5a4 4 0 0 1 4 4v2.5l1 2H2l1-2V5.5a4 4 0 0 1 4-4zM5.5 11.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Section = 'buttons' | 'forms' | 'display' | 'feedback' | 'overlays' | 'inputs+';

const sections: { id: Section; label: string; emoji: string }[] = [
  { id: 'buttons', label: 'Buttons', emoji: '🎛' },
  { id: 'forms', label: 'Forms', emoji: '📋' },
  { id: 'display', label: 'Display', emoji: '🎨' },
  { id: 'feedback', label: 'Feedback', emoji: '💬' },
  { id: 'overlays', label: 'Overlays', emoji: '🪟' },
  { id: 'inputs+', label: 'Inputs+', emoji: '⚡' },
];

export function PlaygroundPage() {
  const [section, setSection] = useState<Section>('buttons');

  // Button state
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link'>('primary');
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnFullWidth, setBtnFullWidth] = useState(false);
  const [btnIcon, setBtnIcon] = useState(true);

  // Form state
  const [textValue, setTextValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('react');
  const [sliderValue, setSliderValue] = useState(50);
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option-a');
  const [textError, setTextError] = useState(false);

  // Display state
  const [avatarSize, setAvatarSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [badgeVariant, setBadgeVariant] = useState<'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'>('primary');
  const [badgeDot, setBadgeDot] = useState(false);
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set(['design']));
  const [ratingValue, setRatingValue] = useState(3);

  // Feedback state
  const [alertVariant, setAlertVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [progressValue, setProgressValue] = useState(65);
  const [progressVariant, setProgressVariant] = useState<'default' | 'success' | 'warning' | 'error'>('default');

  // Overlays
  const [tooltipPlacement, setTooltipPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top');

  // Inputs+
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState(false);

  const { items: snackItems, add: addSnack, dismiss } = useSnackbar();

  const toggleChip = (chip: string) => {
    setActiveChips((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) next.delete(chip);
      else next.add(chip);
      return next;
    });
  };

  const fireSnack = (variant: 'default' | 'success' | 'error' | 'warning') => {
    const messages: Record<string, { title: string; message: string }> = {
      default: { title: 'Info', message: 'This is a notification message.' },
      success: { title: 'Success!', message: 'Your changes were saved successfully.' },
      error: { title: 'Error', message: 'Something went wrong. Please try again.' },
      warning: { title: 'Warning', message: 'API rate limit is at 80%.' },
    };
    addSnack({ ...messages[variant], variant });
  };

  // Live code snippets (update with state)
  const buttonCode = `<ButtonRoot
  variant="${btnVariant}"
  size="${btnSize}"${btnLoading ? '\n  loading' : ''}${btnDisabled ? '\n  disabled' : ''}${btnFullWidth ? '\n  fullWidth' : ''}
>
${btnIcon ? '  <ButtonIcon><SaveIcon /></ButtonIcon>\n' : ''}  <ButtonLabel>Save changes</ButtonLabel>
</ButtonRoot>`;

  const formsCode = `<Stack gap={5}>
  <TextField
    label="Project name"
    value="${textValue}"
    error={${textError}}${textError ? `\n    helperText="Project name is required."` : ''}
  />
  <Select
    label="Framework"
    value="${selectValue}"
    options={frameworks}
  />
  <Slider
    label="Replicas"
    value={${sliderValue}}
    min={1} max={20}
    showValue
  />
  <Checkbox
    label="Enable auto-scaling"
    checked={${checked}}
  />
  <Switch
    label="Dark mode preview"
    checked={${switchOn}}
  />
  <RadioGroup name="region" value="${radioValue}">
    <Radio value="option-a" label="US East" />
    <Radio value="option-b" label="EU West" />
    <Radio value="option-c" label="AP South" />
  </RadioGroup>
</Stack>`;

  const displayCode = `{/* Avatar — size: ${avatarSize} */}
<Avatar name="Alex Kim" size="${avatarSize}" />

{/* Badge — variant: ${badgeVariant}${badgeDot ? ', dot' : ''} */}
<Badge variant="${badgeVariant}"${badgeDot ? ' dot' : ''}>Admin</Badge>

{/* Rating — value: ${ratingValue}/5 */}
<Rating value={${ratingValue}} onChange={setRatingValue} size="lg" />

{/* Active chips: [${Array.from(activeChips).join(', ') || 'none'}] */}
<Stack direction="row" gap={2} wrap>
  {chips.map((chip) => (
    <Chip key={chip} selected={activeChips.has(chip)}
      onClick={() => toggleChip(chip)}>{chip}</Chip>
  ))}
</Stack>`;

  const feedbackCode = `{/* Alert — variant: ${alertVariant} */}
<Alert variant="${alertVariant}" title="${alertVariant.charAt(0).toUpperCase() + alertVariant.slice(1)}">
  {/* ${alertVariant} message here */}
</Alert>

{/* Progress — ${progressValue}%, variant: ${progressVariant} */}
<Progress
  value={${progressValue}}
  variant="${progressVariant}"
  label="Upload"
/>

{/* Spinner */}
<Spinner size="md" />

{/* Snackbar — trigger via useSnackbar() */}
const { add } = useSnackbar();
add({ variant: 'success', title: 'Done!', message: '...' });`;

  const overlaysCode = `{/* Tooltip — placement: ${tooltipPlacement} */}
<Tooltip
  content="This is a tooltip"
  placement="${tooltipPlacement}"
>
  <ButtonRoot variant="outline">
    <ButtonLabel>Hover or focus me</ButtonLabel>
  </ButtonRoot>
</Tooltip>

{/* Accordion */}
<Accordion type="single" collapsible items={[
  { value: 'a1', trigger: 'What is Tokis?', content: '...' },
  { value: 'a2', trigger: 'Is it open source?', content: '...' },
]} />

{/* Tabs */}
<Tabs tabs={[
  { value: 'tab1', label: 'Overview', content: '...' },
  { value: 'tab2', label: 'Settings', content: '...' },
]} />`;

  const inputsPlusCode = `{/* OTP Input${otpError ? ' — error state' : ''} */}
<OtpInput
  length={6}
  value={otpValue}
  onChange={setOtpValue}
  error={${otpError}}
  label="Verification code"
/>

{/* File Drop Zone */}
<FileDropZone
  label="Drop files here, or click to browse"
  hint="PNG, JPG, PDF up to 5MB"
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024}
  onFiles={(files) => console.log(files)}
/>

{/* Badge Gallery — all variants */}
{['default', 'primary', 'success', 'warning', 'error', 'info']
  .map((v) => <Badge key={v} variant={v}>{v}</Badge>)}`;

  const codeBySection: Record<Section, string> = {
    buttons: buttonCode,
    forms: formsCode,
    display: displayCode,
    feedback: feedbackCode,
    overlays: overlaysCode,
    'inputs+': inputsPlusCode,
  };

  return (
    <div className="playground">
      <SnackbarContainer items={snackItems} onDismiss={dismiss} />

      <header className="playground__header">
        <h1 className="playground__title">Component Playground</h1>
        <p className="playground__subtitle">
          Live, interactive demos of every Tokis component. Tweak props and see changes instantly.
        </p>
      </header>

      <nav className="playground__nav" aria-label="Component sections">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`playground__nav-item${section === s.id ? ' playground__nav-item--active' : ''}`}
            onClick={() => setSection(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className="playground__content">

        {/* ── Buttons ── */}
        {section === 'buttons' && (
          <div className="playground__section">
            <div className="playground__preview">
              <div className="playground__preview-canvas">
                <Stack gap={4} align="center">
                  <ButtonRoot
                    variant={btnVariant}
                    size={btnSize}
                    loading={btnLoading}
                    disabled={btnDisabled}
                    fullWidth={btnFullWidth}
                    style={btnFullWidth ? { width: '100%', maxWidth: 300 } : undefined}
                  >
                    {btnIcon && <ButtonIcon><SaveIcon /></ButtonIcon>}
                    <ButtonLabel>Save changes</ButtonLabel>
                  </ButtonRoot>

                  {/* All variants at once */}
                  <div style={{ borderTop: '1px solid var(--tokis-color-border)', paddingTop: 'var(--tokis-spacing-4)', width: '100%' }}>
                    <p style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', textAlign: 'center', margin: '0 0 var(--tokis-spacing-3)' }}>
                      All variants at current size
                    </p>
                    <Stack direction="row" gap={2} wrap justify="center">
                      {(['primary', 'secondary', 'ghost', 'outline', 'destructive', 'link'] as const).map((v) => (
                        <ButtonRoot key={v} variant={v} size={btnSize}>
                          <ButtonLabel>{v}</ButtonLabel>
                        </ButtonRoot>
                      ))}
                    </Stack>
                  </div>
                </Stack>
              </div>

            </div>

            <div className="playground__controls">
              <h2 className="playground__controls-title">Button</h2>

              <div className="playground__control-group">
                <label className="playground__control-label">Variant</label>
                <div className="playground__control-options">
                  {(['primary', 'secondary', 'ghost', 'outline', 'destructive', 'link'] as const).map((v) => (
                    <button key={v} className={`demo-option${btnVariant === v ? ' demo-option--active' : ''}`} onClick={() => setBtnVariant(v)}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Size</label>
                <div className="playground__control-options">
                  {(['sm', 'md', 'lg', 'xl'] as const).map((v) => (
                    <button key={v} className={`demo-option${btnSize === v ? ' demo-option--active' : ''}`} onClick={() => setBtnSize(v)}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">States</label>
                <Stack gap={2}>
                  <Switch label="Loading" checked={btnLoading} onChange={setBtnLoading} size="sm" />
                  <Switch label="Disabled" checked={btnDisabled} onChange={setBtnDisabled} size="sm" />
                  <Switch label="Full Width" checked={btnFullWidth} onChange={setBtnFullWidth} size="sm" />
                  <Switch label="Show Icon" checked={btnIcon} onChange={setBtnIcon} size="sm" />
                </Stack>
              </div>
            </div>
          </div>
        )}

        {/* ── Forms ── */}
        {section === 'forms' && (
          <div className="playground__section">
            <div className="playground__preview">
              <div className="playground__preview-canvas">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <Stack gap={5} style={{ width: '100%', maxWidth: 440 }}>
                    <TextField
                      label="Project name"
                      placeholder="my-awesome-app"
                      value={textValue}
                      onChange={(e) => setTextValue(e.target.value)}
                      error={textError}
                      helperText={textError ? 'Project name is required.' : textValue.length > 0 ? `${textValue.length} chars` : 'Give your project a unique name.'}
                    />
                    <Select
                      label="Framework"
                      value={selectValue}
                      onChange={setSelectValue}
                      options={[
                        { value: 'react', label: 'React' },
                        { value: 'vue', label: 'Vue' },
                        { value: 'svelte', label: 'Svelte' },
                        { value: 'solid', label: 'SolidJS' },
                        { value: 'angular', label: 'Angular' },
                      ]}
                    />
                    <Slider label="Replicas" value={sliderValue} min={1} max={20} step={1} showValue onChange={setSliderValue} />
                    <Stack gap={3}>
                      <Checkbox
                        label="Enable auto-scaling"
                        description="Automatically adjust replicas based on load."
                        checked={checked}
                        onChange={setChecked}
                      />
                      <Switch label="Dark mode preview" checked={switchOn} onChange={setSwitchOn} />
                    </Stack>
                    <RadioGroup label="Region" name="pg-region" value={radioValue} onChange={setRadioValue}>
                      <Radio value="option-a" label="US East" description="Lowest latency for US users." />
                      <Radio value="option-b" label="EU West" description="GDPR compliant region." />
                      <Radio value="option-c" label="AP South" description="Closest to Asia Pacific users." />
                    </RadioGroup>
                  </Stack>
                </div>
              </div>
            </div>

            <div className="playground__controls">
              <h2 className="playground__controls-title">Form Controls</h2>

              <div className="playground__control-group">
                <label className="playground__control-label">TextField State</label>
                <Switch label="Error state" checked={textError} onChange={setTextError} size="sm" />
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Slider value: {sliderValue}</label>
                <input
                  type="range" min={1} max={20} value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--tokis-color-primary)' }}
                />
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Live values</label>
                <div style={{
                  fontSize: 'var(--tokis-font-size-xs)', fontFamily: 'var(--tokis-font-family-mono)',
                  background: 'var(--tokis-color-background)', border: '1px solid var(--tokis-color-border)',
                  borderRadius: 'var(--tokis-radius-md)', padding: 'var(--tokis-spacing-3)', lineHeight: 2,
                }}>
                  <div><span style={{ color: 'var(--tokis-text-tertiary)' }}>name:</span> {textValue || '—'}</div>
                  <div><span style={{ color: 'var(--tokis-text-tertiary)' }}>framework:</span> {selectValue}</div>
                  <div><span style={{ color: 'var(--tokis-text-tertiary)' }}>replicas:</span> {sliderValue}</div>
                  <div><span style={{ color: 'var(--tokis-text-tertiary)' }}>auto-scale:</span> {checked ? 'true' : 'false'}</div>
                  <div><span style={{ color: 'var(--tokis-text-tertiary)' }}>dark preview:</span> {switchOn ? 'true' : 'false'}</div>
                  <div><span style={{ color: 'var(--tokis-text-tertiary)' }}>region:</span> {radioValue}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Display ── */}
        {section === 'display' && (
          <div className="playground__section">
            <div className="playground__preview">
              <div className="playground__preview-canvas" style={{ flexDirection: 'column', gap: 'var(--tokis-spacing-6)' }}>
                {/* Avatar */}
                <Stack direction="row" gap={4} align="center">
                  <Avatar name="Alex Kim" size={avatarSize} />
                  <Stack gap={1}>
                    <span style={{ fontWeight: 'var(--tokis-font-weight-semibold)', fontSize: 'var(--tokis-font-size-sm)' }}>Alex Kim</span>
                    <Stack direction="row" gap={1}>
                      <Badge variant={badgeVariant} dot={badgeDot}>Admin</Badge>
                      <Badge variant="success" dot>Online</Badge>
                    </Stack>
                  </Stack>
                </Stack>

                {/* Avatar sizes */}
                <Stack direction="row" gap={2} align="center">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
                    <Tooltip key={s} content={s} placement="top">
                      <Avatar name={`${s} size`} size={s} />
                    </Tooltip>
                  ))}
                </Stack>

                {/* Chips */}
                <Stack direction="row" gap={2} wrap>
                  {['design', 'engineering', 'product', 'marketing', 'data'].map((chip) => (
                    <Chip key={chip} selected={activeChips.has(chip)} onClick={() => toggleChip(chip)}>
                      {chip}
                    </Chip>
                  ))}
                </Stack>

                {/* Rating */}
                <Stack gap={1}>
                  <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', fontWeight: 'var(--tokis-font-weight-medium)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Rating
                  </span>
                  <Stack direction="row" gap={3} align="center">
                    <Rating value={ratingValue} onChange={setRatingValue} size="lg" />
                    <Badge variant="warning">{ratingValue} / 5</Badge>
                  </Stack>
                </Stack>
              </div>
            </div>

            <div className="playground__controls">
              <h2 className="playground__controls-title">Display</h2>

              <div className="playground__control-group">
                <label className="playground__control-label">Avatar Size</label>
                <div className="playground__control-options">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((v) => (
                    <button key={v} className={`demo-option${avatarSize === v ? ' demo-option--active' : ''}`} onClick={() => setAvatarSize(v)}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Badge Variant</label>
                <div className="playground__control-options">
                  {(['default', 'primary', 'success', 'warning', 'error', 'info'] as const).map((v) => (
                    <button key={v} className={`demo-option${badgeVariant === v ? ' demo-option--active' : ''}`} onClick={() => setBadgeVariant(v)}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <Switch label="Badge dot mode" checked={badgeDot} onChange={setBadgeDot} size="sm" />
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Star Rating: {ratingValue}/5</label>
                <input
                  type="range" min={0} max={5} step={1} value={ratingValue}
                  onChange={(e) => setRatingValue(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--tokis-color-warning)' }}
                />
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Selected chips</label>
                <div style={{ fontSize: 'var(--tokis-font-size-xs)', fontFamily: 'var(--tokis-font-family-mono)', color: 'var(--tokis-text-secondary)' }}>
                  [{Array.from(activeChips).join(', ')}]
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Feedback ── */}
        {section === 'feedback' && (
          <div className="playground__section">
            <div className="playground__preview">
              <div className="playground__preview-canvas">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--tokis-spacing-5)', width: '100%', maxWidth: 460 }}>
                  <Alert variant={alertVariant} title={alertVariant.charAt(0).toUpperCase() + alertVariant.slice(1)}>
                    {alertVariant === 'info' && 'Your deployment is being processed. This may take a few moments.'}
                    {alertVariant === 'success' && 'All 142 tests passed. Your build is ready to deploy.'}
                    {alertVariant === 'warning' && 'API rate limit is at 80%. Consider upgrading your plan.'}
                    {alertVariant === 'error' && 'Build failed. Check the error logs for more information.'}
                  </Alert>

                  <Stack gap={3} style={{ width: '100%' }}>
                    <Stack direction="row" justify="space-between" align="center">
                      <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>Upload progress</span>
                      <span style={{ fontSize: 'var(--tokis-font-size-xs)', fontFamily: 'var(--tokis-font-family-mono)', color: 'var(--tokis-text-tertiary)' }}>{progressValue}%</span>
                    </Stack>
                    <Progress value={progressValue} variant={progressVariant} label="Upload" />
                    <input
                      type="range" min={0} max={100} value={progressValue}
                      onChange={(e) => setProgressValue(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--tokis-color-primary)', cursor: 'pointer' }}
                    />
                  </Stack>

                  <Stack direction="row" gap={4} align="center" justify="center">
                    {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                      <Stack key={s} gap={1} align="center">
                        <Spinner size={s} />
                        <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>{s}</span>
                      </Stack>
                    ))}
                  </Stack>

                  {/* Snackbar triggers */}
                  <Stack gap={2} style={{ width: '100%' }}>
                    <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                      Snackbar
                    </p>
                    <Stack direction="row" gap={2} wrap>
                      {(['default', 'success', 'error', 'warning'] as const).map((v) => (
                        <ButtonRoot key={v} size="sm" variant={v === 'default' ? 'secondary' : v === 'error' ? 'destructive' : 'outline'} onClick={() => fireSnack(v)}>
                          <ButtonLabel>{v}</ButtonLabel>
                        </ButtonRoot>
                      ))}
                    </Stack>
                  </Stack>
                </div>
              </div>
            </div>

            <div className="playground__controls">
              <h2 className="playground__controls-title">Feedback</h2>

              <div className="playground__control-group">
                <label className="playground__control-label">Alert Variant</label>
                <div className="playground__control-options">
                  {(['info', 'success', 'warning', 'error'] as const).map((v) => (
                    <button key={v} className={`demo-option${alertVariant === v ? ' demo-option--active' : ''}`} onClick={() => setAlertVariant(v)}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Progress Variant</label>
                <div className="playground__control-options">
                  {(['default', 'success', 'warning', 'error'] as const).map((v) => (
                    <button key={v} className={`demo-option${progressVariant === v ? ' demo-option--active' : ''}`} onClick={() => setProgressVariant(v)}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">Progress: {progressValue}%</label>
                <input
                  type="range" min={0} max={100} value={progressValue}
                  onChange={(e) => setProgressValue(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--tokis-color-primary)' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Overlays ── */}
        {section === 'overlays' && (
          <div className="playground__section">
            <div className="playground__preview">
              <div className="playground__preview-canvas" style={{ flexDirection: 'column', gap: 'var(--tokis-spacing-8)' }}>
                {/* Tooltip */}
                <Stack gap={2} align="center">
                  <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tooltip — {tooltipPlacement}
                  </p>
                  <div style={{ padding: 30 }}>
                    <Tooltip content="This is a tooltip" placement={tooltipPlacement}>
                      <ButtonRoot variant="outline">
                        <ButtonLabel>Hover or focus me</ButtonLabel>
                      </ButtonRoot>
                    </Tooltip>
                  </div>
                </Stack>

                {/* Accordion */}
                <Stack gap={2} style={{ width: '100%', maxWidth: 420 }}>
                  <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Accordion
                  </p>
                  <Accordion
                    type="single"
                    collapsible
                    items={[
                      {
                        value: 'a1',
                        trigger: 'What is Tokis?',
                        content: <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)', lineHeight: 1.6 }}>Tokis is a performance-first, token-native design system for React. Zero runtime styling, fully accessible.</p>,
                      },
                      {
                        value: 'a2',
                        trigger: 'Is it open source?',
                        content: <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)', lineHeight: 1.6 }}>Yes! Tokis is MIT licensed and free to use in personal and commercial projects.</p>,
                      },
                      {
                        value: 'a3',
                        trigger: 'Does it support dark mode?',
                        content: <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)', lineHeight: 1.6 }}>Absolutely. Dark mode is baked in via CSS variables — instant switching, no flicker, system preference support.</p>,
                      },
                    ]}
                  />
                </Stack>

                {/* Tabs */}
                <Stack gap={2} style={{ width: '100%', maxWidth: 420 }}>
                  <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tabs
                  </p>
                  <Tabs
                    tabs={[
                      { value: 'tab1', label: 'Overview', content: <p style={{ margin: 'var(--tokis-spacing-4) 0', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>Tab content for Overview panel.</p> },
                      { value: 'tab2', label: 'Settings', content: <p style={{ margin: 'var(--tokis-spacing-4) 0', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>Tab content for Settings panel.</p> },
                      { value: 'tab3', label: 'Advanced', content: <p style={{ margin: 'var(--tokis-spacing-4) 0', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>Tab content for Advanced panel.</p> },
                    ]}
                  />
                </Stack>
              </div>
            </div>

            <div className="playground__controls">
              <h2 className="playground__controls-title">Overlays & Interactive</h2>

              <div className="playground__control-group">
                <label className="playground__control-label">Tooltip Placement</label>
                <div className="playground__control-options">
                  {(['top', 'bottom', 'left', 'right'] as const).map((v) => (
                    <button key={v} className={`demo-option${tooltipPlacement === v ? ' demo-option--active' : ''}`} onClick={() => setTooltipPlacement(v)}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="playground__control-group">
                <p style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', margin: 0, lineHeight: 1.6 }}>
                  The Accordion and Tabs above are fully interactive — click to expand/collapse or switch tabs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Inputs+ ── */}
        {section === 'inputs+' && (
          <div className="playground__section">
            <div className="playground__preview">
              <div className="playground__preview-canvas">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--tokis-spacing-8)', width: '100%', maxWidth: 480 }}>
                  {/* OTP */}
                  <Stack gap={3}>
                    <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      OTP Input
                    </p>
                    <OtpInput
                      length={6}
                      value={otpValue}
                      onChange={setOtpValue}
                      error={otpError}
                      label="Verification code"
                    />
                    <Stack direction="row" gap={2}>
                      <ButtonRoot
                        size="sm"
                        variant={otpValue.length === 6 ? 'primary' : 'outline'}
                        onClick={() => {
                          if (otpValue.length !== 6) { setOtpError(true); return; }
                          setOtpError(false);
                          addSnack({ title: 'Verified!', message: `Code "${otpValue}" accepted.`, variant: 'success' });
                          setOtpValue('');
                        }}
                      >
                        <ButtonLabel>Verify</ButtonLabel>
                      </ButtonRoot>
                      <ButtonRoot size="sm" variant="ghost" onClick={() => { setOtpValue(''); setOtpError(false); }}>
                        <ButtonLabel>Clear</ButtonLabel>
                      </ButtonRoot>
                    </Stack>
                    {otpError && (
                      <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-color-error)' }}>
                        Please enter all 6 digits.
                      </p>
                    )}
                    {otpValue.length > 0 && (
                      <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', fontFamily: 'var(--tokis-font-family-mono)' }}>
                        Current: {otpValue} ({otpValue.length}/6)
                      </p>
                    )}
                  </Stack>

                  {/* File Drop Zone */}
                  <Stack gap={3}>
                    <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      File Drop Zone
                    </p>
                    <FileDropZone
                      label="Drop files here, or click to browse"
                      hint="PNG, JPG, PDF up to 5MB"
                      accept="image/*,.pdf"
                      multiple
                      maxSize={5 * 1024 * 1024}
                      onFiles={(files) => addSnack({
                        title: 'Files ready',
                        message: `${files.length} file${files.length !== 1 ? 's' : ''} selected.`,
                        variant: 'success',
                      })}
                    />
                  </Stack>

                  {/* Color-coded badges showcase */}
                  <Stack gap={3}>
                    <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Badge Gallery
                    </p>
                    <Stack direction="row" gap={2} wrap>
                      {['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'].map((v) => (
                        <Badge key={v} variant={v as Parameters<typeof Badge>[0]['variant']}>{v}</Badge>
                      ))}
                    </Stack>
                    <Stack direction="row" gap={2} wrap>
                      {['default', 'primary', 'success', 'warning', 'error', 'info'].map((v) => (
                        <Badge key={v} variant={v as Parameters<typeof Badge>[0]['variant']} dot>{v}</Badge>
                      ))}
                    </Stack>
                  </Stack>
                </div>
              </div>
            </div>

            <div className="playground__controls">
              <h2 className="playground__controls-title">Advanced Inputs</h2>

              <div className="playground__control-group">
                <label className="playground__control-label">OTP state</label>
                <Stack gap={2}>
                  <Switch label="Error state" checked={otpError} onChange={setOtpError} size="sm" />
                </Stack>
              </div>

              <div className="playground__control-group">
                <label className="playground__control-label">What's here</label>
                <ul style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-secondary)', lineHeight: 2, margin: 0, paddingLeft: 16 }}>
                  <li><strong>OTP Input</strong> — 6-digit code entry with paste support</li>
                  <li><strong>File Drop Zone</strong> — drag & drop or click to upload</li>
                  <li><strong>Badge Gallery</strong> — all variants including dot mode</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Constant live code panel — always visible */}
      <div className="playground__code-panel">
        <div className="playground__code-panel-header">
          <span className="playground__code-panel-label">Live code</span>
          <span className="playground__code-panel-section">{sections.find((s) => s.id === section)?.label}</span>
        </div>
        <CodeBlock
          code={codeBySection[section]}
          language="tsx"
          theme="dark"
        />
      </div>
    </div>
  );
}
