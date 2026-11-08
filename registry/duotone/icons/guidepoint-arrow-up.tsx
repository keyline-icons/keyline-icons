import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GuidepointArrowUp({ size = 24, ...props }: IconProps) {
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
      <path d="M5 12.99C7.2091 12.99 9 14.78 9 17C9 19.21 7.2091 21 5 21C2.7909 21 1 19.21 1 17C1 14.78 2.7909 12.99 5 12.99ZM19 12.99C21.2091 12.99 23 14.78 23 17C23 19.21 21.2091 21 19 21C16.7909 21 15 19.21 15 17C15 14.78 16.7909 12.99 19 12.99Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M16.0596 16C16.5298 16.05 16.9588 16.53 17.004 17C16.9523 17.51 16.516 18 15.9991 18H7.9991C7.4829 18 7.0527 17.56 7 17.05C7.0004 16.5 7.4474 16 7.9991 16H16.0596ZM10.7012 3.67C11.3016 2.77 12.665 2.78 13.2852 3.66L16.7892 8.73C17.0173 9.16 17.0026 9.81 16.8173 10.2C16.5395 10.64 15.9979 10.99 15.4493 10.99H8.5499C8.0697 10.99 7.5686 10.7 7.2809 10.36C6.998 9.91 6.9153 9.21 7.24 8.69L10.7012 3.67Z" fill="currentColor"/>
    </svg>
  )
}
