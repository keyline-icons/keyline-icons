import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Solar({ size = 24, ...props }: IconProps) {
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
      <path d="M6 14L18 14L22 22L2 22ZM10 14L8.6667 22M14 14L15.3333 22M4 18L20 18M7.6933 10.5556L7.9689 10C8.7286 8.4686 10.2905 7.5 12 7.5C13.7095 7.5 15.2714 8.4686 16.0311 10L16.3067 10.5556M12 4.5L12 1M17.7175 6.2825L19.364 4.636M6.2825 6.2825L4.636 4.636M4.4689 10L1.4689 10M19.5311 10L22.5311 10"/>
    </svg>
  )
}
