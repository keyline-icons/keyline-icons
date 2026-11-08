import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrianglesCenterlineInwardVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M13 1V23H11V1H13ZM1.585 6.87C1.877 6.77 2.299 6.77 2.56 6.95L8.816 11.17C9.091 11.36 9.257 11.73 9.257 12.06C9.221 12.35 9.057 12.67 8.816 12.83L2.56 17.05C2.253 17.26 1.855 17.28 1.528 17.11C1.28 16.97 1.07 16.62 1 16.36V7.78C1 7.41 1.259 7.04 1.585 6.87ZM22.316 6.81C22.639 6.98 23 7.41 23 7.78V16.3C22.956 16.61 22.755 16.95 22.47 17.1C22.143 17.28 21.747 17.26 21.44 17.05L15.184 12.83C14.943 12.67 14.765 12.23 14.729 11.95C14.786 11.71 14.973 11.31 15.184 11.17L21.44 6.95C21.645 6.81 22.078 6.78 22.316 6.81Z" fill="currentColor"/>
    </svg>
  )
}
