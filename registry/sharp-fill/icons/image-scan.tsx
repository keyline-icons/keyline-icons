import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ImageScan({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 22L8 22L3 22C2.4477 22 2 21.5523 2 21L2 20.8284C2 20.5632 2.1054 20.3088 2.2929 20.1213L3.7071 18.7071L6 16.4142L8.2929 14.1213C8.4804 13.9338 8.7348 13.8284 9 13.8284C9.2652 13.8284 9.5196 13.9338 9.7071 14.1213L11.373 15.7872C11.5607 15.9749 11.7729 16.1277 12 16.2442L12 15.5129L12 13.5858L9.7071 11.2929C9.3166 10.9024 8.6834 10.9024 8.2929 11.2929L3.7071 15.8787C3.5196 16.0662 3.2652 16.1716 3 16.1716C2.4477 16.1716 2 15.7239 2 15.1716L2 10.2929L2 3C2 2.4477 2.4477 2 3 2L8 2L12 2L12 1.0001L14 1.0001L14 2.0001L14 3.0001L14 15.5129L14 21.0001L14 22.0001L14 23.0001L12 23.0001ZM9.5 7.5C9.5 6.6716 8.8284 6 8 6C7.1716 6 6.5 6.6716 6.5 7.5C6.5 8.3284 7.1716 9 8 9C8.8284 9 9.5 8.3284 9.5 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M17 2L17 3L17 10L17 11M17 22L17 21L17 14L17 13M21 21L21 20L21 18L21 17M21 15L21 14L21 10L21 9M21 7L21 6L21 4L21 3"/>
    </svg>
  )
}
