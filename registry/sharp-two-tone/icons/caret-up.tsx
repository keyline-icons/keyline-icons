import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaretUp({ size = 24, ...props }: IconProps) {
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
      <path d="M11.1362 5.4961C11.5221 4.8346 12.4779 4.8346 12.8638 5.4961L19.8638 17.4961C20.2527 18.1628 19.7718 19 19 19L5 19C4.2282 19 3.7473 18.1628 4.1362 17.4961L11.1362 5.4961Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 6L5 18L19 18L12 6Z"/>
    </svg>
  )
}
