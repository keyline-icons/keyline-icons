import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailShield({ size = 24, ...props }: IconProps) {
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
      <path d="M12 18L2 18L2 2L22 2L22 11M2 5L11.2929 9C11.7154 9.2817 12.2846 9.2817 12.7071 9L22 5M22 15.4476L22 19.2779L21.3928 20.0631C20.8667 20.7434 20.0327 21.5058 18.863 21.9355C18.6288 22.0215 18.3712 22.0215 18.137 21.9355C16.9673 21.5058 16.1333 20.7434 15.6073 20.0631L15 19.2778L15 15.4476L15.5173 15.3862C16.6758 15.2488 17.5504 14.6703 18.0731 14.1632C18.2974 13.9456 18.7026 13.9456 18.9269 14.1632C19.4496 14.6703 20.3242 15.2488 21.4827 15.3862Z" fill="none"/>
    </svg>
  )
}
