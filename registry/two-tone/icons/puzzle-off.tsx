import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PuzzleOff({ size = 24, ...props }: IconProps) {
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
      <path d="M18 18V19C18 20.6569 16.657 22 15 22H5C3.343 22 2 20.6569 2 19V17.5C2 16.6716 2.672 16 3.5 16H4C5.105 16 6 15.1046 6 14C6 12.8954 5.105 12 4 12H3.5C2.672 12 2 11.3284 2 10.5V9C2 7.3431 3.343 6 5 6H6L18 18ZM20.075 15.8323L8.168 3.9252C7.987 3.7442 7.875 3.4942 7.875 3.2181C7.875 2.8023 8.129 2.4458 8.49 2.2949C8.956 2.1048 9.466 2 10 2C12.209 2 14 3.7908 14 6H15C16.657 6 18 7.3431 18 9V10C20.209 10 22 11.7908 22 14C22 14.5344 21.895 15.0442 21.705 15.5102C21.554 15.8714 21.198 16.1251 20.782 16.1251C20.506 16.1251 20.256 16.0133 20.075 15.8323Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6.853 6.8535C6.763 6.944 6.638 7 6.5 7H5C3.895 7 3 7.8954 3 9V10.5C3 10.7761 3.224 11 3.5 11H4C5.657 11 7 12.3431 7 14C7 15.6569 5.657 17 4 17H3.5C3.224 17 3 17.2239 3 17.5V19C3 20.1046 3.895 21 5 21H15C16.105 21 17 20.1046 17 19V17.5C17 17.3619 17.056 17.2369 17.146 17.1465M2 2L22 22"/>
    </svg>
  )
}
