import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlarmClock({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 4C16.9706 4 21 8.0294 21 13C21 17.9706 16.9706 22 12 22C7.0294 22 3 17.9706 3 13C3 8.0294 7.0294 4 12 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 8L12 13L17 13M2.75 5.3462L3 5.0627C4.1606 3.7467 5.5957 2.7013 7.2042 2L7.3953 1.9167M21.25 5.3462L21 5.0627C19.8394 3.7467 18.4043 2.7013 16.7958 2L16.6047 1.9167M8 19.9282L6.5152 22.5M16 19.9282L17.4848 22.5"/>
    </svg>
  )
}
