import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SendFast({ size = 24, ...props }: IconProps) {
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
      <path d="M22 2L17.2802 17.9523L12.7229 11.2771L6.0477 6.7198L22 2ZM12.7229 11.2771L22 2M1.7071 22.2929L6.7929 17.2071M1.7071 16.2929L5.7929 12.2071M7.7071 22.2929L11.7929 18.2071" fill="none"/>
    </svg>
  )
}
