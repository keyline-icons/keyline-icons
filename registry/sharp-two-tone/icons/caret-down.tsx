import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaretDown({ size = 24, ...props }: IconProps) {
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
      <path d="M11.1362 18.5039L4.1362 6.5039C3.7473 5.8372 4.2282 5 5 5L19 5C19.7718 5 20.2527 5.8372 19.8638 6.5039L12.8638 18.5039C12.4779 19.1654 11.5221 19.1654 11.1362 18.5039Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 18L5 6L19 6L12 18Z"/>
    </svg>
  )
}
