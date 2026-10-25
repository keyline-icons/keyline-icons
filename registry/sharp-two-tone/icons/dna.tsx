import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Dna({ size = 24, ...props }: IconProps) {
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
      <path d="M4.3915 4L19.6085 4M7.2977 8L16.7023 8M16.7023 16L7.2977 16M19.6085 20L4.3915 20" fill="none" strokeOpacity="0.4"/>
      <path d="M20 1L20 2C20 2.8333 19.7918 3.6667 19.391 4.5C18.9903 5.3333 18.3973 6.1667 17.6569 7C16.9164 7.8333 16.029 8.6667 15.0615 9.5C14.094 10.3333 13.0472 11.1667 12 12C10.9528 12.8333 9.906 13.6667 8.9385 14.5C7.971 15.3333 7.0836 16.1667 6.3431 17C5.6027 17.8333 5.0097 18.6667 4.609 19.5C4.2082 20.3333 4 21.1667 4 22L4 23M4 1L4 2C4 2.8333 4.2082 3.6667 4.609 4.5C5.0097 5.3333 5.6027 6.1667 6.3431 7C7.0836 7.8333 7.971 8.6667 8.9385 9.5C9.906 10.3333 10.9528 11.1667 12 12C13.0472 12.8333 14.094 13.6667 15.0615 14.5C16.029 15.3333 16.9164 16.1667 17.6569 17C18.3973 17.8333 18.9903 18.6667 19.391 19.5C19.7918 20.3333 20 21.1667 20 22L20 23" fill="none"/>
    </svg>
  )
}
