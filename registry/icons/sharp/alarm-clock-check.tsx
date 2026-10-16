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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 5C16.4183 5 20 8.5817 20 13C20 17.4183 16.4183 21 12 21C7.5817 21 4 17.4183 4 13C4 8.5817 7.5817 5 12 5ZM8.8771 13.2628L11.3713 15.8284L15.1208 9.6931M2.75 5.3462L3 5.0627C4.1606 3.7467 5.5957 2.7013 7.2042 2L7.3953 1.9167M21.25 5.3462L21 5.0627C19.8394 3.7467 18.4043 2.7013 16.7958 2L16.6047 1.9167M8 19.9282L6.5152 22.5M16 19.9282L17.4848 22.5"/>
    </svg>
  )
}
