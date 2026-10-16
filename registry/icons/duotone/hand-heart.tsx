import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandHeart({ size = 24, ...props }: IconProps) {
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
      <path d="M8.9168 13.0295C6.7265 11.1171 5 9.12 5 6.6C5 4.0594 7.149 2 9.8 2C11 2 12.0741 2.4367 13 3.2C13.9259 2.4367 15 2 16.2 2C18.851 2 21 4.0594 21 6.6C21 8.94 19.5113 10.8292 17.5449 12.6183" strokeOpacity="0.4"/>
      <path d="M13.4629 10.4635C14.6345 9.29202 16.5355 9.29191 17.707 10.4635C18.8784 11.6351 18.8787 13.5361 17.707 14.7076L13.707 18.7076C12.9174 19.4971 11.762 20.0006 10.5 20.0006H5.82812C5.56345 20.0006 5.30843 20.1062 5.12109 20.2935L3.70703 21.7076C3.42106 21.9934 2.99072 22.0791 2.61719 21.9244C2.2437 21.7697 2.00022 21.4048 2 21.0006V16.3004C2 16.0352 2.10554 15.7809 2.29297 15.5933L5.09277 12.7935C5.55972 12.3266 6.20701 12.0006 7 12.0006H9.5C10.1713 12.0006 10.7794 12.2663 11.2285 12.6969L13.4629 10.4635Z" fill="currentColor" stroke="none"/>
      <path d="M3 14V22"/>
    </svg>
  )
}
