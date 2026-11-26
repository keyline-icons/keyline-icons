import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquarePen({ size = 24, ...props }: IconProps) {
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
      <path d="M11.3714 13.9285L15.4962 12.2786C15.6219 12.2283 15.7361 12.153 15.8319 12.0572L21.1945 6.6945C22.1709 5.7183 22.1709 3.7817 21.1945 2.8054C20.2183 1.8291 18.2817 1.8291 17.3054 2.8055L11.9428 8.1681C11.847 8.2639 11.7717 8.3781 11.7214 8.5038L10.0715 12.6286C9.745 13.4449 10.5551 14.255 11.3714 13.9285Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13 3L3 3L3 21L7 17L21 17L21 11M11 13L15.1248 11.3501L20.4874 5.9874C21.1709 5.304 21.1709 4.196 20.4874 3.5126C19.804 2.8291 18.696 2.8291 18.0126 3.5126L12.6499 8.8752Z"/>
    </svg>
  )
}
