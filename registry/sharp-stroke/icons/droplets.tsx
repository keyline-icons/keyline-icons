import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Droplets({ size = 24, ...props }: IconProps) {
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
      <path d="M12 5L13.7568 3.3943L18.9775 8.7966C20.2748 10.1391 21 11.9331 21 13.8C21 17.7765 17.7765 21 13.8 21C11.7344 21 9.7682 20.1128 8.4014 18.564L7.9434 18.0449M10.2092 7.3963C11.0163 8.1922 11.4706 9.2783 11.4706 10.4118C11.4706 12.7509 9.5744 14.6471 7.2353 14.6471C4.8962 14.6471 3 12.7509 3 10.4118C3 9.2783 3.4543 8.1922 4.2614 7.3963L7.2353 4.4633L10.2092 7.3963Z" fill="none" strokeLinejoin="miter"/>
    </svg>
  )
}
