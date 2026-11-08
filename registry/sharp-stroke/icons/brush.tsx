import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Brush({ size = 24, ...props }: IconProps) {
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
      <path d="M6.989 15.018L7 14.945C7.287 12.984 8.34 11.207 9.938 9.983L18.466 3.455C19.335 2.789 20.578 2.862 21.36 3.623C22.119 4.363 22.214 5.53 21.585 6.377L15.129 15.064C13.941 16.662 12.139 17.721 10.135 18C9.731 18.07 9.21 18.029 9 18L8.973 17.996M2.463 18.276H2.041C2.01 18.276 1.991 18.31 2.004 18.339L2.314 18.997C2.644 19.698 3.179 20.267 3.839 20.617C4.799 21.127 5.93 21.127 6.89 20.617L7.252 20.425C7.683 20.196 8.057 19.864 8.346 19.455L8.479 19.267C8.924 18.636 9.095 17.835 8.949 17.062L8.922 16.919C8.814 16.343 8.506 15.828 8.065 15.476C7.444 14.981 6.619 14.861 5.899 15.168C5.291 15.426 4.819 15.962 4.612 16.622C4.305 17.603 3.437 18.276 2.463 18.276Z"/>
    </svg>
  )
}
