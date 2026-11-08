import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ghost({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C16.971 1 21 5.03 21 10V21C21 21.46 20.68 21.87 20.229 21.97C19.779 22.08 19.313 21.86 19.105 21.45L18.874 20.98C18.591 20.42 17.968 20.05 17.343 20C16.361 20 15.5 20.8 15.5 21.78V23H13.5V21.5C13.5 20.67 12.828 20 12 20C11.172 20 10.5 20.67 10.5 21.5V23H8.5V21.78L8.492 21.62L8.491 21.6L8.466 21.43L8.464 21.42L8.433 21.29L8.431 21.29L8.389 21.16C8.157 20.54 7.497 20.07 6.813 20C6.142 20 5.427 20.38 5.126 20.98L4.895 21.45C4.687 21.86 4.221 22.08 3.771 21.97C3.32 21.87 3 21.46 3 21V10C3 5.03 7.029 1 12 1ZM8 8V11H10V8H8ZM14 8V11H16V8H14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
