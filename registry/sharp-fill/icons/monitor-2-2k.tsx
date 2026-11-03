import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor22k({ size = 24, ...props }: IconProps) {
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
      <path d="M2 2L22 2C22.5523 2 23 2.4477 23 3L23 17C23 17.5523 22.5523 18 22 18L2 18C1.4477 18 1 17.5523 1 17L1 3C1 2.4477 1.4477 2 2 2ZM5.0637 7.9489C5.2855 7.4196 5.7116 6.8321 6.1828 6.5179C6.644 6.2105 7.3589 6 8 6C8.7652 6 9.6128 6.2975 10.1008 6.7157C10.6064 7.1491 11 7.9871 11 8.7C11 9.9536 10.073 10.9329 9.2265 11.5798L8.7299 12L10.5 12L10.5 14L6 14C5.5804 14 5.2054 13.738 5.061 13.344C4.9167 12.9499 5.0337 12.5077 5.3541 12.2366L7.9541 10.0366C8.7005 9.4831 9 9.2464 9 8.7C9 8.4129 8.9936 8.4009 8.7992 8.2343C8.5872 8.0525 8.4348 8 8 8C7.6411 8 7.506 8.0395 7.2922 8.1821C7.0884 8.3179 7.0145 8.3804 6.9363 8.6511ZM15 6L15 8.4707L17.3113 6.275L18.6887 7.725L16.5701 9.7377L18.7663 12.3576L17.2337 13.6424L15.1173 11.1179L15 11.2293L15 14L13 14L13 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 17L12 21M7 21L17 21" fill="none"/>
    </svg>
  )
}
