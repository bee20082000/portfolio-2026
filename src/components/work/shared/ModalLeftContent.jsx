// Shared left-column content for all work case modals.
// Renders: category + year pills, Context block, Approach block.
// Pass customPills={[{label, bg, color}]} to override auto-derived pills.
export default function ModalLeftContent({ data, customPills }) {
  const pills = customPills || [
    {
      label: data.category || data.role || 'Project',
      bg: '#C3FB50',
      color: '#000000',
    },
    {
      label: data.timeline
        ? (data.timeline.match(/\d{4}/)?.[0] || data.timeline)
        : '2024',
      bg: '#EFBEEB',
      color: '#000000',
    },
  ]

  const pillStyle = (bg, color) => ({
    backgroundColor: bg,
    color,
    padding: '2px 20px',
    borderRadius: '99px',
    fontSize: '18px',
    fontWeight: '400',
    letterSpacing: '-0.03em',
  })

  const sectionLabelStyle = {
    fontSize: '12px',
    fontWeight: '700',
    color: '#9aa0a6',
    letterSpacing: '0.02em',
    marginBottom: '8px',
  }

  const bodyTextStyle = {
    fontSize: '14px',
    color: '#e8eaed',
    margin: 0,
    fontWeight: '400',
    lineHeight: '1.6',
  }

  const contextText =
    data.challenge || data.context || data.description || 'Project context details...'

  const approachText = data.strategy1
    ? `${data.strategy1} ${data.strategy2 || ''} ${data.solutionDesc || ''}`.trim()
    : data.approach || data.description || 'Project approach and strategy...'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Metadata Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {pills.map((pill, i) => (
          <div key={i} style={pillStyle(pill.bg, pill.color)}>
            {pill.label}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Context */}
        <div>
          <div style={sectionLabelStyle}>Context</div>
          <p style={bodyTextStyle}>{contextText}</p>
        </div>

        {/* Approach */}
        <div>
          <div style={sectionLabelStyle}>Approach</div>
          <p style={bodyTextStyle}>{approachText}</p>
        </div>
      </div>
    </div>
  )
}
