import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bike2Off({ size = 24, ...props }: IconProps) {
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
      <path d="M19.6465 19.6465C19.1443 19.8736 18.5869 20 18 20C15.7909 20 14 18.2091 14 16C14 15.4131 14.1264 14.8557 14.3535 14.3535M10 16C10 18.2091 8.2091 20 6 20C3.7909 20 2 18.2091 2 16C2 13.7909 3.7909 12 6 12C8.2091 12 10 13.7909 10 16ZM7.2914 7.2914C7.5872 7.9108 8.0892 8.4128 8.7086 8.7086M6 16L8.7403 9.6061C8.8246 9.4092 8.9675 9.2494 9.1434 9.1434M17.6703 12.0134C17.779 12.0045 17.889 12 18 12C20.2091 12 22 13.7909 22 16C22 16.111 21.9955 16.221 21.9866 16.3297M16 4L17.4279 5.4279C17.6908 5.6908 17.5851 6.1383 17.2325 6.2558L15.5031 6.8323C15.2301 6.9233 15.0901 7.2252 15.1969 7.4924L15.8462 9M2 2L22 22" fill="none"/>
    </svg>
  )
}
