import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tower({ size = 24, ...props }: IconProps) {
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
      <path d="M11.613 1.03C11.868 0.98 12.332 0.99 12.556 1.14L21.528 7.15C21.894 7.39 22.056 7.85 21.929 8.27C21.817 8.64 21.422 8.92 21.051 8.98L19 8.98V21H23V23H1V21H5V8.98H3C2.56 8.98 2.171 8.69 2.043 8.27C1.916 7.85 2.079 7.39 2.445 7.15L11.613 1.03Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 10.98C13.657 10.98 15 12.33 15 13.99V17.99C15 18.55 14.552 19 14 19H10C9.448 19 9 18.55 9 17.99V13.99C9 12.33 10.343 10.98 12 10.98Z" fill="currentColor"/>
    </svg>
  )
}
