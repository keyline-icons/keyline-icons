import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sprout({ size = 24, ...props }: IconProps) {
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
      <path d="M12 17L12 11M4 21C5.8885 18.4819 8.8524 17 12 17C15.1476 17 18.1115 18.4819 20 21ZM12 11C11.8679 6.5439 8.2174 3 3.7593 3C3.5058 3 3.2524 3.0117 3 3.035C3.1321 7.4911 6.7826 11.035 11.2407 11.035C11.4942 11.035 11.7476 11.0233 12 11ZM12 12.5C12.2435 12.5216 12.4878 12.5325 12.7323 12.5325C17.2074 12.5325 20.8709 8.9732 21 4.5C20.7565 4.4784 20.5122 4.4675 20.2677 4.4675C15.7926 4.4675 12.1291 8.0268 12 12.5Z"/>
    </svg>
  )
}
