import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlaneOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19.1251 21.9536L18.643 22.4242C18.2631 22.7934 17.7541 23 17.2243 23C16.6136 23 16.0351 22.7258 15.6485 22.253L11.3127 16.8627L9.011 18.5067L9.0613 20.8584C9.0614 20.8654 9.0615 20.8725 9.0615 20.8795C9.0615 21.0157 9.0337 21.1504 8.9799 21.2755C8.659 22.0203 7.9258 22.5029 7.1148 22.5029C6.5858 22.5029 6.0776 22.2964 5.6985 21.9275L2.1105 18.4252C1.7268 18.0518 1.5104 17.5391 1.5104 17.0038C1.5104 16.1779 2.0222 15.4384 2.7951 15.1474C2.8986 15.1084 3.0078 15.0869 3.1184 15.0836L5.469 15.0151L7.0792 12.7165L1.7866 8.7199C1.2913 8.3458 1.0001 7.761 1.0001 7.1403C1.0001 6.6048 1.217 6.0922 1.6014 5.7194L2.6136 4.7313C2.9935 4.362 3.5024 4.1554 4.0322 4.1554C4.0746 4.1554 4.117 4.1567 4.1594 4.1594L20.2432 20.2433C20.1905 20.6966 19.983 21.1178 19.6556 21.4358L19.1251 21.9536ZM9.5142 5.2716L12.1491 5.8258L16.1972 2.8852C17.8838 1.6599 19.9151 1 21.9998 1.0001C22.5522 1 23 1.4477 23 2.0001C23 4.045 22.3249 6.0328 21.0796 7.6548L18.0575 11.5906L18.8697 14.6271L9.5142 5.2716Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22" fill="none"/>
    </svg>
  )
}
