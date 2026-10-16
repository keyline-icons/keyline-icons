import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M12.3047 1.0103C13.5344 0.9046 14.7038 1.6395 15.0829 2.7896C15.3586 2.6878 15.6537 2.6265 15.9588 2.6167C17.238 2.5759 18.4058 3.4179 18.6941 4.6519C18.9298 4.5831 19.1787 4.5465 19.4323 4.5464C20.7947 4.5466 21.9977 5.6036 21.9986 7.026C21.9999 9.6905 22.0008 13.3023 21.9977 13.5056C21.9885 15.2327 21.633 17.3182 20.6384 19.1071C19.6237 20.932 17.9367 22.4482 15.3525 22.8934C15.3353 22.8963 15.317 22.8991 15.2997 22.9012C14.021 23.0526 12.161 23.1415 10.1202 22.2957C8.0776 21.4489 5.9715 19.7153 4.0794 16.447L2.3783 13.8278C1.6697 12.7364 1.9925 11.3228 3.0512 10.606C4.0147 9.9543 5.3291 10.0522 6.178 10.856L7.1858 11.8102L6.3372 5.2974L6.3381 5.2965C6.0953 3.8522 7.1182 2.5598 8.5207 2.3179C9.0695 2.2234 9.6215 2.3011 10.1075 2.5142C10.5006 1.6791 11.3406 1.0933 12.3047 1.0103Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11.0991 8.384L11.2579 10.4687M14.3364 5.3415L14.6988 10.6534M17.8658 7.7303L17.9984 10.937"/>
    </svg>
  )
}
