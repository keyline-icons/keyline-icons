import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BowTie({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 7.50219C2 6.34949 3.2461 5.62759 4.2461 6.20089L9.4974 9.21179C9.8083 9.39009 10 9.72099 10 10.0794V13.9206C10 14.279 9.8083 14.6099 9.4974 14.7882L4.2461 17.7991C3.2461 18.3724 2 17.6505 2 16.4978V7.50219ZM22 7.50219C22 6.34949 20.7539 5.62759 19.7539 6.20089L14.5026 9.21179C14.1917 9.39009 14 9.72099 14 10.0794V13.9206C14 14.279 14.1917 14.6099 14.5026 14.7882L19.7539 17.7991C20.7539 18.3724 22 17.6505 22 16.4978V7.50219ZM10 10.5C10 9.67159 10.6716 8.99999 11.5 8.99999H12.5C13.3284 8.99999 14 9.67159 14 10.5V13.5C14 14.3284 13.3284 15 12.5 15H11.5C10.6716 15 10 14.3284 10 13.5V10.5Z" fill="none"/>
    </svg>
  )
}
