import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquarePen({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 3L6 3C4.3431 3 3 4.3431 3 6L3 18C3 19.6569 4.3431 21 6 21L18 21C19.6569 21 21 19.6569 21 18L21 12" strokeOpacity="0.4"/>
      <path d="M10.8714 14.4285L14.9962 12.7786C15.1219 12.7283 15.2361 12.653 15.3319 12.5572L21.1945 6.6945C22.2685 5.6206 22.2685 3.8794 21.1945 2.8055C20.1206 1.7315 18.3794 1.7315 17.3055 2.8055L11.4428 8.6681C11.347 8.7639 11.2717 8.8781 11.2214 9.0038L9.5715 13.1286C9.423 13.5 9.51 13.9242 9.7929 14.2071C10.0758 14.49 10.5 14.577 10.8714 14.4285Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
