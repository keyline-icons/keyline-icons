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
      <path d="M16.9946 7.3749L19.8396 7.1478C19.8926 7.1435 19.9457 7.1414 19.9988 7.1414C21.1034 7.1414 21.9988 8.0369 21.9988 9.1414C21.9988 9.3982 21.9493 9.6526 21.8532 9.8906L20.4432 13.3805C20.1378 14.1364 19.4041 14.6313 18.5888 14.6313C18.0151 14.6313 17.469 14.3849 17.0894 13.9548L15.2006 11.8151C15.0393 11.6324 14.9503 11.397 14.9503 11.1533C14.9503 11.0249 14.9751 10.8977 15.0231 10.7787L16.147 7.9971C16.2889 7.646 16.617 7.4051 16.9946 7.3749Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7.3201 9.8235L7.3201 17L3 17M3 13L3 21" strokeOpacity="0.4"/>
      <path d="M9.8533 2.2187L17.2708 5.2156C18.0267 5.521 18.5216 6.2547 18.5216 7.07C18.5216 7.3267 18.4721 7.5811 18.3759 7.8192L16.5029 12.4551C16.1975 13.211 15.4638 13.7059 14.6485 13.7059C14.3918 13.7059 14.1374 13.6564 13.8993 13.5603L6.4819 10.5634C5.348 10.1053 4.6057 9.0048 4.6057 7.7818C4.6057 7.3967 4.6798 7.0151 4.8241 6.658L5.9479 3.8765C6.4061 2.7426 7.5066 2.0003 8.7295 2.0003C9.1147 2.0003 9.4962 2.0745 9.8533 2.2187Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
