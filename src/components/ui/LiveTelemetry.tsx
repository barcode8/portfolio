import { useMemo } from 'react';
import { useTelemetry } from '../../hooks/useTelemetry';

const TELEMETRY_SEQUENCE = [
  "INITIALIZING SECURE UPLINK...",
  "INGESTING MEDIA PAYLOAD...",
  "QUEUING ASYNC JOB [ID: 8492]...",
  "CLOUDINARY UPLINK ESTABLISHED...",
  "DOWNSCALING TO 1080P... [IN PROGRESS]",
  "DOWNSCALING TO 1080P... [OK]",
  "METADATA SYNC COMPLETE."
];

export function LiveTelemetry() {
  const sequence = useMemo(() => TELEMETRY_SEQUENCE, []);
  const { lines, isComplete } = useTelemetry(sequence);

  return (
    <div className="bg-[#05080F] border border-[#152030] p-4 mt-4 font-mono text-sm overflow-hidden" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="space-y-1.5">
        {lines.map((line, idx) => {
          // Format line colors
          let formattedLine = (
            <span className="text-[var(--color-text-secondary)]">{line}</span>
          );

          if (line.includes("[OK]")) {
            formattedLine = (
              <span>
                <span className="text-[var(--color-text-secondary)]">{line.replace("[OK]", "")}</span>
                <span className="text-[#2ECC71] drop-shadow-[0_0_8px_rgba(46,204,113,0.5)]">[OK]</span>
              </span>
            );
          } else if (line.includes("COMPLETE.")) {
            formattedLine = (
              <span>
                <span className="text-[var(--color-text-secondary)]">{line.replace("COMPLETE.", "")}</span>
                <span className="text-[#2ECC71] drop-shadow-[0_0_8px_rgba(46,204,113,0.5)]">COMPLETE.</span>
              </span>
            );
          }

          return (
            <div key={idx} className="flex items-start">
              <span className="text-[var(--color-amber)] mr-3 shrink-0">{'>'}</span>
              <div className="flex-1 min-w-0 break-words leading-relaxed">
                {formattedLine}
                {!isComplete && idx === lines.length - 1 && (
                  <span className="inline-block w-2 h-3 bg-[var(--color-amber)] ml-2 animate-pulse align-middle" />
                )}
              </div>
            </div>
          );
        })}
        {isComplete && (
          <div className="flex items-start mt-1.5">
            <span className="text-[var(--color-amber)] mr-3 shrink-0">{'>'}</span>
            <span className="inline-block w-2 h-3 bg-[var(--color-amber)] animate-pulse align-middle mt-0.5" />
          </div>
        )}
      </div>
    </div>
  );
}
