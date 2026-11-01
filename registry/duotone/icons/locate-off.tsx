import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LocateOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11 18.9291C7.9283 18.4846 5.5154 16.0717 5.0709 13L2 13C1.4477 13 1 12.5523 1 12C1 11.4477 1.4477 11 2 11L5.0709 11C5.2857 9.5038 5.9803 8.1178 7.0503 7.0503L16.9498 16.9498C15.8822 18.0197 14.4962 18.7143 13 18.9291L13 22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22L11 18.9291ZM13 5.0709C16.0717 5.5154 18.4846 7.9283 18.9291 11L22 11C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13L18.7098 13C18.5243 13.2002 18.2638 13.314 17.9909 13.314C17.731 13.314 17.4817 13.2108 17.2979 13.027L17.2838 13.0411L10.9589 6.7162L10.973 6.7021C10.7892 6.5183 10.686 6.269 10.686 6.0091C10.686 5.7362 10.7998 5.4757 11 5.2902L11 2C11 1.4477 11.4477 1 12 1C12.5523 1 13 1.4477 13 2L13 5.0709Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22" fill="none"/>
    </svg>
  )
}
