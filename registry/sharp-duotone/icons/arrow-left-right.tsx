import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowLeftRight({ size = 24, ...props }: IconProps) {
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
      <path d="M22 7L3 7M7.2929 11.2929L3 7L7.2929 2.7071" fill="none" strokeOpacity="0.4"/>
      <path d="M2 17L21 17M16.7071 12.7071L21 17L16.7071 21.2929" fill="none"/>
    </svg>
  )
}
