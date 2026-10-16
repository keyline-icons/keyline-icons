import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cctv({ size = 24, ...props }: IconProps) {
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
      <path d="M9.8533 2.2187L17.2708 5.2156C18.0267 5.521 18.5216 6.2547 18.5216 7.07C18.5216 7.3267 18.4721 7.5811 18.3759 7.8192L16.5029 12.4551C16.1975 13.211 15.4638 13.7059 14.6485 13.7059C14.3918 13.7059 14.1374 13.6564 13.8993 13.5603L6.4819 10.5634C5.348 10.1053 4.6057 9.0048 4.6057 7.7818C4.6057 7.3967 4.6798 7.0151 4.8241 6.658L5.9479 3.8765C6.4061 2.7426 7.5066 2.0003 8.7295 2.0003C9.1147 2.0003 9.4962 2.0745 9.8533 2.2187Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M17.0742 8.3718L19.9192 8.1446C20.6602 8.0854 21.2044 8.8268 20.926 9.516L19.516 13.0059C19.2375 13.6951 18.331 13.8504 17.8391 13.293L15.9503 11.1533M7.3201 9.8235L7.3201 17L3 17M3 13L3 21"/>
    </svg>
  )
}
