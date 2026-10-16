import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Container({ size = 24, ...props }: IconProps) {
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
      <path d="M1 19L1 9C1 8.7348 1.1054 8.4804 1.2929 8.2929L5.2929 4.2929C5.4804 4.1054 5.7348 4 6 4L22 4C22.5523 4 23 4.4477 23 5L23 15C23 15.2652 22.8946 15.5196 22.7071 15.7071L18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20L2 20C1.4477 20 1 19.5523 1 19ZM5 10L5 18L7 18L7 10L5 10ZM9 10L9 18L11 18L11 10L9 10ZM13 10L13 18L15 18L15 10L13 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
