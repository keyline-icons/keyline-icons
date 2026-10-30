import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CoffeePot({ size = 24, ...props }: IconProps) {
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
      <path d="M4.7061 4L15.2939 4C16.0579 4 16.5397 4.822 16.1664 5.4886L14.2 9L5.8 9L3.8336 5.4886C3.4603 4.822 3.9421 4 4.7061 4ZM5.8 9L3.56 13.7143L3.33276 14.236C3.11328 14.7399 3 15.2837 3 15.8333L3 16.4189C3 17.9603 3.98635 19.3288 5.44868 19.8162C5.81384 19.9379 6.19623 20 6.58114 20L13.4189 20C13.8038 20 14.1862 19.9379 14.5513 19.8162C16.0136 19.3288 17 17.9603 17 16.4189L17 15.8333C17 15.2837 16.8867 14.7399 16.6672 14.236L16.44 13.7143L14.2 9M15 4L17 4C19.2091 4 21 5.7909 21 8L21 11" fill="none"/>
    </svg>
  )
}
