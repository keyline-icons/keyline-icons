import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareChevronDown({ size = 24, ...props }: IconProps) {
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
      <path d="M18 2 C20.2091 2 22 3.7909 22 6 L22 18 C22 20.2091 20.2091 22 18 22 L6 22 C3.7909 22 2 20.2091 2 18 L2 6 C2 3.7909 3.7909 2 6 2 L18 2 ZM7.2929 10.7071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071L16.7071 10.7071C16.8946 10.5196 17 10.2652 17 10C17 9.7348 16.8946 9.4804 16.7071 9.2929C16.3166 8.9024 15.6834 8.9024 15.2929 9.2929L12 12.5858L8.7071 9.2929C8.3166 8.9024 7.6834 8.9024 7.2929 9.2929C6.9024 9.6834 6.9024 10.3166 7.2929 10.7071Z" fill="currentColor"/>
    </svg>
  )
}
