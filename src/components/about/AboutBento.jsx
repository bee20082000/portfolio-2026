import { forwardRef } from 'react';
import YearsTile from './YearsTile';
import EduTile from './EduTile';
import ExpTile from './ExpTile';
import ContactTile from './ContactTile';

const AboutBento = forwardRef(({ className, style, id }, ref) => {
  return (
    <div
      className={className}
      id={id}
      ref={ref}
      style={style}
    >
      <ExpTile />
      <YearsTile />
      <ContactTile />
      <EduTile />
    </div>
  );
});

AboutBento.displayName = 'AboutBento';
export default AboutBento;
