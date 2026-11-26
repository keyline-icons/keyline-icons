import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailForward({ size = 24, ...props }: IconProps) {
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
      <path d="M12 20L2 20L2 4L22 4L22 10.7574M2 7L11.2929 11C11.7154 11.2817 12.2846 11.2817 12.7071 11L22 7M18.7071 12.7071L22 16L18.7071 19.2929M22 16L15 16L15 21" fill="none"/>
    </svg>
  )
}
