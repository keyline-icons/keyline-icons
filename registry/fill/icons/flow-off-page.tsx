import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowOffPage({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4L19 4C21.2092 4 23 5.7908 23 8L23 11C23 11.9443 22.5554 12.8334 21.8 13.4L13.8 19.4C12.7333 20.2 11.2667 20.2 10.2 19.4L2.2 13.4C1.4446 12.8334 1 11.9443 1 11L1 8C1 5.7908 2.7908 4 5 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
