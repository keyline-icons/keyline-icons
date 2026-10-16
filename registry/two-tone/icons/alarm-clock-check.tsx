import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlarmClockCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4C16.9706 4 21 8.0294 21 13C21 17.9706 16.9706 22 12 22C7.0294 22 3 17.9706 3 13C3 8.0294 7.0294 4 12 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 5C16.4183 5 20 8.5817 20 13C20 17.4183 16.4183 21 12 21C7.5817 21 4 17.4183 4 13C4 8.5817 7.5817 5 12 5ZM9.1716 13.5657L11.3713 15.8284L14.8284 10.1716M3 5.0627C4.1606 3.7467 5.5957 2.7013 7.2042 2M21 5.0627C19.8394 3.7467 18.4043 2.7013 16.7958 2M8 19.9282L6.8038 22M16 19.9282L17.1962 22"/>
    </svg>
  )
}
