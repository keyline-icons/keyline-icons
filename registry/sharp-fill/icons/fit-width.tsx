import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FitWidth({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3L22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 4C1 3.4477 1.4477 3 2 3ZM8.4142 11L10 9.4142L8.5858 8L5.2929 11.2929C4.9024 11.6834 4.9024 12.3166 5.2929 12.7071L8.5858 16L10 14.5858L8.4142 13L15.5858 13L14 14.5858L15.4142 16L18.7071 12.7071C19.0976 12.3166 19.0976 11.6834 18.7071 11.2929L15.4142 8L14 9.4142L15.5858 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
