import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HardHat({ size = 24, ...props }: IconProps) {
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
      <path d="M12 22L2 22C1.4477 22 1 21.5523 1 21L1 17C1 16.4477 1.4477 16 2 16L3 16L3 13C3 9.0803 5.5048 5.7479 9 4.5124L9 3C9 2.4477 9.4477 2 10 2L14 2C14.5523 2 15 2.4477 15 3L15 4.5124C18.4952 5.7479 21 9.0803 21 13L21 16L22 16C22.5523 16 23 16.4477 23 17L23 21C23 21.5523 22.5523 22 22 22Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 17L2 17L2 21L22 21L22 17L20 17M4 17L4 13C4 9.2723 6.5495 6.1401 10 5.252M4 17L10 17M20 17L20 13C20 9.2723 17.4505 6.1401 14 5.252M20 17L14 17M10 17L14 17M10 17L10 5.252M14 17L14 5.252M10 5.252L10 3L14 3L14 5.252"/>
    </svg>
  )
}
