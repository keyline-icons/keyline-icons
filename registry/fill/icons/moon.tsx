import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Moon({ size = 24, ...props }: IconProps) {
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
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C12.3844 2 12.7348 2.2203 12.9013 2.5668C13.0678 2.9133 13.021 3.3245 12.7809 3.6247C11.061 5.7746 11.2326 8.8738 13.1794 10.8206C15.1262 12.7674 18.2254 12.939 20.3753 11.2191C20.6755 10.979 21.0867 10.9322 21.4332 11.0987C21.7797 11.2652 22 11.6156 22 12Z" fill="currentColor"/>
    </svg>
  )
}
