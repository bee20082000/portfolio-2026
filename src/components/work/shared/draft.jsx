
return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', width: '100%' }}>
        {/* 12-col grid: all header rows share the same column rhythm */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px 24px',
            alignItems: 'baseline',
            width: '100%',
        }}>

            {/* Year label */}
            <div style={{ gridColumn: '5', display: 'flex', alignItems: 'baseline' }}>
                <h3 style={sectionLabelStyle}>Year</h3>
            </div>

            {/* Pills */}
            <div style={{ gridColumn: '6 / -1', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
                {pills.map((pill) => (
                    <div key={pill.label} style={pillStyle2(pill.bg, pill.color)}>
                        {data.timeline}
                    </div>
                ))}

            </div>


            {/* Categories label */}
            <div style={{ gridColumn: '5', display: 'flex', alignItems: 'baseline' }}>
                <h3 style={sectionLabelStyle}>Scope</h3>
            </div>

            {/* Context text */}
            <div style={{ gridColumn: '6 / -1', display: 'flex', alignItems: 'baseline' }}>
                <p style={bodyTextStyle}>{categoryText}</p>
            </div>


            {/* Context label */}
            <div style={{ gridColumn: '5', display: 'flex', alignItems: 'baseline' }}>
                <h3 style={sectionLabelStyle}>Context</h3>
            </div>
            {/* Context text */}
            <div style={{ gridColumn: '6 / -1', display: 'flex', alignItems: 'baseline' }}>
                <p style={bodyTextStyle}>{contextText}</p>
            </div>

            {/* Approach label */}
            <div style={{ gridColumn: '5', display: 'flex', alignItems: 'baseline' }}>
                <h3 style={sectionLabelStyle}>Approach</h3>
            </div>
            {/* Approach text */}
            <div style={{ gridColumn: '6 / -1', display: 'flex', alignItems: 'baseline' }}>
                <p style={bodyTextStyle}>{approachText}</p>
            </div>
        </div>
    </div>
)