import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FolderArrowRight({ size = 24, ...props }: IconProps) {
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
      <path d="M10 20L6 20C4.3431 20 3 18.6569 3 17L3 7C3 5.3431 4.3431 4 6 4L8.6716 4C9.202 4 9.7107 4.2107 10.0858 4.5858L11.4142 5.9142C11.7893 6.2893 12.298 6.5 12.8284 6.5L18 6.5C19.6569 6.5 21 7.8431 21 9.5L21 10M15 17H21M18 14L21 17L18 20"/>
    </svg>
  )
}
