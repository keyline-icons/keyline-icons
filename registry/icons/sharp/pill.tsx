import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pill({ size = 24, ...props }: IconProps) {
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
      <path d="M12.9948 4.3735C13.8742 3.4941 15.0669 3 16.3106 3C17.5543 3 18.7471 3.4941 19.6265 4.3735C20.5059 5.2529 21 6.4457 21 7.6894C21 8.9331 20.5059 10.1258 19.6265 11.0052L11.0052 19.6265C10.1258 20.5059 8.9331 21 7.6894 21C6.4457 21 5.2529 20.5059 4.3735 19.6265C3.4941 18.7471 3 17.5543 3 16.3106C3 15.0669 3.4941 13.8742 4.3735 12.9948L12.9948 4.3735ZM8.6841 8.6841L15.3159 15.3159" fill="none"/>
    </svg>
  )
}
