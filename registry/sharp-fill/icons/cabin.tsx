import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cabin({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.049 1C12.292 1.026 12.574 1.145 12.74 1.327L22.999 12.611L22.261 13.285L21.521 13.956L20.649 12.999H17V14.999H21.825C21.92 15.288 22 15.681 22 16.001L21.989 16.262C21.968 16.487 21.89 16.794 21.822 16.999H17V18.999H21.825C21.92 19.288 22 19.681 22 20.002L21.984 20.303C21.827 21.813 20.551 22.999 19 22.999H5C3.449 22.999 2.172 21.812 2.015 20.302L1.997 19.948C2.01 19.753 2.114 19.182 2.163 18.999H7V16.999H2.176C2.109 16.793 2.033 16.485 2.012 16.259L2 16.001C2 15.737 2.098 15.243 2.163 14.999H7V12.999H3.352L2.479 13.956L1 12.612L3 10.412V2.999C3 2.447 3.448 1.999 4 1.999H8C8.552 1.999 9 2.447 9 2.999V3.812L11.296 1.288C11.478 1.126 11.802 1 12.049 1ZM12.075 12.001C10.421 12.004 9 13.344 9 14.999V20.999H15V14.999C15 13.394 13.66 12.082 12.075 12.001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
