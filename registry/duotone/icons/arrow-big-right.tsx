import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigRight({ size = 24, ...props }: IconProps) {
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
      <path d="M21.7071 12.7071L14.7071 19.7071C14.4211 19.9931 13.991 20.0787 13.6173 19.9239C13.2436 19.7691 13 19.4045 13 19L13 17C13 16.4477 12.5523 16 12 16L3 16C2.4477 16 2 15.5523 2 15L2 9C2 8.4477 2.4477 8 3 8L12 8C12.5523 8 13 7.5523 13 7L13 5C13 4.5955 13.2436 4.2309 13.6173 4.0761C13.991 3.9213 14.4211 4.0069 14.7071 4.2929L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071Z"/>
    </svg>
  )
}
