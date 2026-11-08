import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Windmill({ size = 24, ...props }: IconProps) {
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
      <path d="M1 22H6M6 22H18M6 22L7 18M18 22H23M18 22L17 18M7 18L8.071 13.72M7 18H17M17 18L15.929 13.72M12 5.22L15.445 2L18.217 4.54L14.756 8L18.202 11.45L15.445 14.2L12 10.76L8.554 14.2L5.798 11.45L9.244 8L5.798 4.55L8.554 2L12 5.22Z"/>
    </svg>
  )
}
