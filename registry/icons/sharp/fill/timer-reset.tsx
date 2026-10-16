import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TimerReset({ size = 24, ...props }: IconProps) {
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
      <path d="M9.2985 21.5962L10.2749 21.8118C10.8414 21.9369 11.4199 22 12 22C16.4183 22 20 18.4183 20 14C20 9.5817 16.4183 6 12 6C7.5817 6 4 9.5817 4 14C4 16.2072 4.9119 18.3163 6.5199 19.8283L7.0054 20.2848M3.1415 21.0634L7.2849 20.4716L6.6931 16.3281M8 2L16 2M12 2L12 6M12 15L12 9M17.6569 8.3431L19.2929 6.7071"/>
    </svg>
  )
}
