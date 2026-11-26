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
      <path d="M13 3H3V21L7 17H21V11" strokeOpacity="0.4"/>
      <path d="M11.371 13.929L15.496 12.279C15.622 12.228 15.736 12.153 15.832 12.057L21.194 6.695C22.171 5.718 22.171 3.782 21.194 2.805C20.218 1.829 18.282 1.829 17.305 2.806L11.943 8.168C11.847 8.264 11.772 8.378 11.721 8.504L10.071 12.629C9.745 13.445 10.555 14.255 11.371 13.929Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
