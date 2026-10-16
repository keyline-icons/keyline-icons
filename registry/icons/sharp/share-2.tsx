import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Share2({ size = 24, ...props }: IconProps) {
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
      <path d="M12.5 5.0001L12.5 9.5001C7.5375 9.724 3.4917 13.5568 2.9999 18.4999C5.2767 15.9472 8.5347 14.4875 11.9552 14.4875C12.1369 14.4875 12.3185 14.4917 12.5 14.4999L12.5 18.9999L20.9999 12L12.5 5.0001Z" fill="none"/>
    </svg>
  )
}
